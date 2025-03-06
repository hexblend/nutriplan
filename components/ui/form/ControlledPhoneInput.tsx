import { appLanguage } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import * as Haptics from 'expo-haptics';
import { Dispatch, SetStateAction } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';
import PhoneInput, {
  ICountry,
  ILanguage,
} from 'react-native-international-phone-number';
import { Error } from '../error';
import { Label } from '../label';

interface ControlledPhoneInputProps<T extends FieldValues> {
  selectedCountry: ICountry | undefined;
  setSelectedCountry: Dispatch<SetStateAction<ICountry | undefined>>;
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: string;
  className?: string;
}

export default function ControlledPhoneInput<T extends FieldValues>({
  selectedCountry,
  setSelectedCountry,
  control,
  name,
  label,
  error,
  className,
}: ControlledPhoneInputProps<T>) {
  return (
    <View className={className}>
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            customMask={['### ### #### ####', '##### ####']}
            onChangeSelectedCountry={(country) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setSelectedCountry(country);
            }}
            theme="dark"
            modalHeight="60%"
            popularCountries={['RO', 'US', 'GB']}
            allowZeroAfterCallingCode={false}
            defaultCountry={appLanguage === 'en' ? 'US' : 'RO'}
            language={appLanguage as ILanguage}
            phoneInputStyles={{
              container: {
                backgroundColor: colors.primary[500],
                borderColor: colors.primary[400],
              },
              flagContainer: {
                backgroundColor: colors.primary[900],
                paddingHorizontal: 12,
              },
            }}
            modalStyles={{
              modal: {
                backgroundColor: colors.primary[900],
              },
              searchInput: {
                borderColor: colors.primary[400],
                backgroundColor: colors.primary[500],
              },
              countryButton: {
                borderColor: colors.primary[400],
                backgroundColor: colors.primary[500],
              },
            }}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </View>
  );
}
