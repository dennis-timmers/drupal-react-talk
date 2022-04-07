<?php

namespace Drupal\graphql_finished\Plugin\GraphQL\SchemaExtension;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Language\LanguageManager;
use Drupal\graphql\GraphQL\ResolverBuilder;
use Drupal\graphql\GraphQL\ResolverRegistryInterface;
use Drupal\graphql\Plugin\GraphQL\SchemaExtension\SdlSchemaExtensionPluginBase;
use Drupal\media\MediaInterface;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * GraphQL Finished Schema class.
 *
 * @SchemaExtension(
 *   id = "graphql_finished",
 *   name = "GraphQL Finished",
 *   description = "Adds GraphQL queries & types for this course",
 * )
 */
class FinishedSchema extends SdlSchemaExtensionPluginBase
{
  /**
   * @var \Drupal\Core\Language\LanguageManager
   */
  protected LanguageManager $languageManager;

  /**
   * @return string
   */
  protected function getCurrentLanguage(): string
  {
    return $this->languageManager->getCurrentLanguage()->getId();
  }

  /**
   * {@inheritdoc}
   *
   * @codeCoverageIgnore
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
  {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('module_handler'),
      $container->get('language_manager'),
    );
  }

  /**
   * AvikoSettingsSchema constructor.
   */
  public function __construct(
    array $configuration,
    $pluginId,
    array $pluginDefinition,
    ModuleHandlerInterface $moduleHandler,
    LanguageManager $languageManager
  ) {
    parent::__construct($configuration, $pluginId, $pluginDefinition, $moduleHandler);
    $this->languageManager = $languageManager;
  }

  /**
   * Registers resolvers.
   *
   * @param \Drupal\graphql\GraphQL\ResolverRegistryInterface $registry
   *   ResolverRegistryInterface.
   */
  public function registerResolvers(ResolverRegistryInterface $registry): void
  {
    $builder = new ResolverBuilder();

    // Instruct GraphQL how to resolve types of a common interface.
    $registry->addTypeResolver(
      'Node',
      function ($value) {
        if ($value instanceof Node) {
          return match ($value->bundle()) {
            'page' => 'Page',
          };
        }
      }
    );

    $registry->addFieldResolver(
      'Node',
      'id',
      $builder
        ->produce('entity_id')
        ->map('entity', $builder->fromParent())
    );

    $registry->addFieldResolver(
      'Node',
      'title',
      $builder
        ->produce('entity_label')
        ->map('entity', $builder->fromParent())
    );

    $registry->addFieldResolver(
      'Node',
      'path',
      $builder
        ->produce('url_path')
        ->map(
          'url',
          $builder
            ->produce('entity_url')
            ->map('entity', $builder->fromParent())
        )
    );

    $this->registerPage($registry, $builder);

    $registry->addTypeResolver(
      'Media',
      function ($value) {
        if ($value instanceof MediaInterface) {
          return match ($value->bundle()) {
            'image' => 'MediaImage',
          };
        }
      }
    );

    $registry->addFieldResolver(
      'Media',
      'id',
      $builder
        ->produce('entity_id')
        ->map('entity', $builder->fromParent())
    );

    $registry->addFieldResolver(
      'Media',
      'name',
      $builder->fromPath('entity:media:image', 'name.value')
    );

    $this->registerMediaImage($registry, $builder);

    $registry->addTypeResolver(
      'Paragraph',
      function ($value) {
        if ($value instanceof Paragraph) {
          return match ($value->bundle()) {
            'hero' => 'Hero',
            'formatted_text' => 'FormattedText',
            'related_pages' => 'RelatedPages',
          };
        }
      }
    );

    $registry->addFieldResolver(
      'Paragraph',
      'id',
      $builder
        ->produce('entity_id')
        ->map('entity', $builder->fromParent())
    );

    $this->registerFormattedText($registry, $builder);
    $this->registerRelatedPages($registry, $builder);
  }

  public function registerPage(ResolverRegistryInterface $registry, ResolverBuilder $builder): void
  {
    $registry->addFieldResolver(
      'Query',
      'page',
      $builder->compose(
        $builder
          ->produce('route_load')
          ->map('path', $builder->fromArgument('path')),

        $builder
          ->produce('route_entity')
          ->map('url', $builder->fromParent())
          ->map(
            'language',
            $builder->fromValue(
              $this->getCurrentLanguage()
            )
          )
      )
    );

    $registry->addFieldResolver(
      'Page',
      'headerImage',
      $builder->compose(
        $builder
          ->produce('entity_reference')
          ->map('entity', $builder->fromParent())
          ->map('field', $builder->fromValue('field_image'))
          ->map('language', $builder->fromValue($this->getCurrentLanguage())),
        $builder
          ->callback(function ($value) {
            return reset($value);
          })
      )
    );

    $registry->addFieldResolver(
      'Page',
      'buildingBlocks',
      $builder->defaultValue(
        $builder
          ->produce('entity_reference_revisions')
          ->map('entity', $builder->fromParent())
          ->map('field', $builder->fromValue('field_building_blocks'))
          ->map('language', $builder->fromValue($this->getCurrentLanguage())),
        $builder->fromValue([])
      )
    );
  }

  public function registerMediaImage(ResolverRegistryInterface $registry, ResolverBuilder $builder): void
  {
    $registry->addFieldResolver(
      'MediaImage',
      'src',
      $builder
        ->produce('image_url')
        ->map('entity', $builder->fromPath('entity:media:image', 'field_media_image.entity'))
    );

    $registry->addFieldResolver(
      'MediaImage',
      'alt',
      $builder->fromPath('entity:media:image', 'field_media_image.alt')
    );
  }

  public function registerFormattedText(ResolverRegistryInterface $registry, ResolverBuilder $builder): void
  {
    $registry->addFieldResolver(
      'FormattedText',
      'html',
      $builder->fromPath('entity:paragraph:formatted_text', 'field_formatted_text.value')
    );
  }

  public function registerRelatedPages(ResolverRegistryInterface $registry, ResolverBuilder $builder): void
  {
    $registry->addFieldResolver(
      'RelatedPages',
      'title',
      $builder->fromPath('entity:paragraph:related_pages', 'field_title.value')
    );

    $registry->addFieldResolver(
      'RelatedPages',
      'references',
      $builder
        ->produce('entity_reference')
        ->map('entity', $builder->fromParent())
        ->map('field', $builder->fromValue('field_reference'))
        ->map('language', $builder->fromValue($this->getCurrentLanguage())),
    );
  }
}
