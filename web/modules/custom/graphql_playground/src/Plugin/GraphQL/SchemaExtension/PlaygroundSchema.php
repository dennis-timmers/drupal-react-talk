<?php

namespace Drupal\graphql_playground\Plugin\GraphQL\SchemaExtension;

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
 * GraphQL Playground Schema class.
 *
 * @SchemaExtension(
 *   id = "graphql_playground",
 *   name = "GraphQL Playground",
 *   description = "Adds GraphQL queries & types for this course",
 * )
 */
class PlaygroundSchema extends SdlSchemaExtensionPluginBase
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
          dd($value);
        }
      }
    );

    $this->registerPage($registry, $builder);
    $this->registerMediaImage($registry, $builder);
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
  }

  public function registerMediaImage(ResolverRegistryInterface $registry, ResolverBuilder $builder): void
  {
  }

  public function registerFormattedText(ResolverRegistryInterface $registry, ResolverBuilder $builder): void
  {
  }

  public function registerRelatedPages(ResolverRegistryInterface $registry, ResolverBuilder $builder): void
  {
  }
}
