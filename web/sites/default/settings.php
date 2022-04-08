<?php

const CONFIG_SYNC_DIRECTORY = 'sync';

// This also includes settings.local.php and settings.ddev.php if these files exist.
require __DIR__ . '/../../profiles/contrib/burst-drupal-distribution/includes/settings.php';

$platformsh = new \Platformsh\ConfigReader\Config();
if (!$platformsh->inRuntime()) {
  return;
}

if (getenv('LANDO_INFO')) {
  $lando_info = json_decode(getenv('LANDO_INFO'), TRUE);

  $settings['cache']['default'] = 'cache.backend.redis';
  $settings['container_yamls'][] = 'modules/redis/example.services.yml';

  // Mailhog.
  $config['smtp.settings']['smtp_on'] = TRUE;
  $config['smtp.settings']['smtp_host'] = 'mailhog';
  $config['smtp.settings']['smtp_port'] = 1025;
}
