import {
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';

import { Link } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '@/providers/AuthProvider';
import { RegisterFormData, registerSchema } from '@/lib/validator';

const Page = () => {
  const { onRegister } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      password: '12345678',
      email: 'maher@gmail.com',
      confirmPassword: '12345678',
    },
    mode: 'onChange',
  });

  const onSignupPress = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const result = await onRegister(data.email, data.password);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white p-6 dark:bg-gray-900"
    >
      <View className="flex-1 justify-center w-full max-w-md mx-auto">
        <Text className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">
          Create Account
        </Text>

        <Text className="text-lg text-gray-600 mb-8 dark:text-white">
          Sign up to start your mental health journey
        </Text>

        <View className="gap-2">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  value={value}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  placeholder="Email address"
                  className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-gray-900 dark:bg-gray-800 dark:text-white"
                />

                {errors.email && (
                  <Text className="text-red-500">{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  value={value}
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={onChange}
                  className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-gray-900 dark:bg-gray-800 dark:text-white"
                />

                {errors.password && (
                  <Text className="text-red-500">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  value={value}
                  secureTextEntry
                  onChangeText={onChange}
                  placeholder="Confirm Password"
                  className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-gray-900 dark:bg-gray-800 dark:text-white"
                />

                {errors.confirmPassword && (
                  <Text className="text-red-500">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSignupPress)}
          className={`bg-blue-600 rounded-xl p-4 items-center mt-6 ${
            isLoading ? 'opacity-50' : ''
          }`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        {Platform.OS == 'web' && (
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600 dark:text-white">
              Already have an account?{' '}
            </Text>

            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
