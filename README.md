# Setup

1. Install Lando (https://github.com/lando/lando or `brew install lando` or any Linux package manager)
2. Clone this repository
3. Install dependencies with `lando composer install`
4. Start Lando with `lando start`
5. Import the database in the root folder with `lando db-import bqa3nqwg4dpcc--main-bvxea6i--db--main--dump.sql.gz`
6. Clear the cache with `lando drush cr`

You should now be able to navigate to `http://cms.drupal-react-talk.localhost`.

You can log in using `io`, password `io`.

# Deployed version

A deployed version of this repository is available here.

https://cms.drupal-react-talk.main-bvxea6i-bqa3nqwg4dpcc.de-2.platformsh.site/
