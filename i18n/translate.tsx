import klot from 'klot'
import { useLocaleIdentifier, LocaleIdentifier } from '@i18n/localization'
import en from '@i18n/translations/en.json'
import nl from '@i18n/translations/nl.json'
import fr from '@i18n/translations/fr.json'
import { useMemo } from 'react'

export function useKlot (): any {
  const localeIdentifier = useLocaleIdentifier()

  const memo = useMemo(() => getKlot(localeIdentifier), [localeIdentifier])

  return memo
}

export function getKlot (localeIdentifier: LocaleIdentifier): any {
  return klot(localeIdentifier.language, { en, nl, fr })
}
