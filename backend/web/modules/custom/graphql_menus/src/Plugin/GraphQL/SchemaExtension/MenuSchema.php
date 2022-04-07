<?php

namespace Drupal\graphql_menus\Plugin\GraphQL\SchemaExtension;

use Drupal\graphql\GraphQL\ResolverBuilder;
use Drupal\graphql\GraphQL\ResolverRegistryInterface;
use Drupal\graphql\Plugin\GraphQL\SchemaExtension\SdlSchemaExtensionPluginBase;

/**
 * @SchemaExtension(
 *   id = "graphql_menus",
 *   name = "GraphQL Menus",
 *   description = "GraphQL menus",
 * )
 */
class MenuSchema extends SdlSchemaExtensionPluginBase
{

  /**
   * @param \Drupal\graphql\GraphQL\ResolverRegistryInterface $registry
   *
   * @return \Drupal\graphql\GraphQL\ResolverRegistryInterface
   */
  public function registerResolvers(ResolverRegistryInterface $registry): ResolverRegistryInterface
  {
    $builder = new ResolverBuilder();

    // Menu query.
    $registry->addFieldResolver(
      'Query',
      'menu',
      $builder
        ->produce('entity_load')
        ->map('type', $builder->fromValue('menu'))
        ->map('id', $builder->fromArgument('type'))
    );

    // Menu name.
    $registry->addFieldResolver(
      'Menu',
      'name',
      $builder
        ->produce('property_path')
        ->map('type', $builder->fromValue('entity:menu'))
        ->map('value', $builder->fromParent())
        ->map('path', $builder->fromValue('label'))
    );

    // Menu items.
    $registry->addFieldResolver(
      'Menu',
      'items',
      $builder->defaultValue(
        $builder
          ->produce('menu_links')
          ->map('menu', $builder->fromParent()),
        $builder->fromValue([])
      )
    );

    // Menu title.
    $registry->addFieldResolver(
      'MenuItem',
      'label',
      $builder
        ->produce('menu_link_label')
        ->map(
          'link',
          $builder->produce('menu_tree_link')
            ->map('element', $builder->fromParent())
        )
    );

    // Menu items.
    $registry->addFieldResolver(
      'MenuItem',
      'items',
      $builder
        ->produce('menu_tree_subtree')
        ->map('element', $builder->fromParent())
    );

    // Menu url.
    $registry->addFieldResolver(
      'MenuItem',
      'url',
      $builder
        ->produce('menu_link_url')
        ->map(
          'link',
          $builder->produce('menu_tree_link')
            ->map('element', $builder->fromParent())
        )
    );

    $registry->addFieldResolver(
      'Url',
      'path',
      $builder
        ->produce('url_path')
        ->map('url', $builder->fromParent())
    );

    return $registry;
  }
}
