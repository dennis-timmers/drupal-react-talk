<?php

namespace Drupal\menu_view_access\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\system\MenuAccessControlHandler;

class ViewMenuAccessControlHandler extends MenuAccessControlHandler {

  public static array $forbiddenMenuIds = ['admin', 'tools', 'account'];

  /**
   * @param \Drupal\Core\Entity\EntityInterface $entity
   * @param string $operation
   * @param \Drupal\Core\Session\AccountInterface $account
   * @return \Drupal\Core\Access\AccessResult|\Drupal\Core\Access\AccessResultAllowed|\Drupal\Core\Access\AccessResultForbidden|\Drupal\Core\Access\AccessResultInterface|\Drupal\Core\Access\AccessResultNeutral
   */
  public function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    if ($operation === 'view') {
      return AccessResult::allowedIf(!in_array($entity->mid, self::$forbiddenMenuIds));
    }

    return parent::checkAccess($entity, $operation, $account);
  }

}
