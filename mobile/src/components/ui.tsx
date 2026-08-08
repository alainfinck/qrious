import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native'

import { colors, spacing } from '../theme/colors'

export function Screen({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.screen, style]}>{children}</View>
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <View style={styles.pageHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.pageTitle}>{title}</Text>
        {description ? <Text style={styles.pageDescription}>{description}</Text> : null}
      </View>
      {action}
    </View>
  )
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  icon,
}: {
  label: string
  onPress?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' && styles.buttonPrimary,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'ghost' && styles.buttonGhost,
        variant === 'danger' && styles.buttonDanger,
        (disabled || loading) && styles.buttonDisabled,
        pressed && !disabled && { opacity: 0.88 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : colors.ink} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.buttonLabel,
              (variant === 'secondary' || variant === 'ghost') && { color: colors.slate700 },
              variant === 'danger' && { color: '#fff' },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  )
}

export function Input({
  label,
  error,
  rightElement,
  ...props
}: TextInputProps & { label?: string; error?: string; rightElement?: React.ReactNode }) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor={colors.slate400}
          style={[
            styles.input,
            rightElement ? { paddingRight: 64 } : null,
            error ? styles.inputError : null,
          ]}
          {...props}
        />
        {rightElement ? <View style={styles.rightElementContainer}>{rightElement}</View> : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export function TextArea({
  label,
  error,
  ...props
}: TextInputProps & { label?: string; error?: string }) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.slate400}
        multiline
        textAlignVertical="top"
        style={[styles.input, styles.textArea, error ? styles.inputError : null]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export function Badge({
  label,
  tone = 'neutral',
}: {
  label: string
  tone?: 'neutral' | 'success' | 'accent' | 'warning'
}) {
  return (
    <View
      style={[
        styles.badge,
        tone === 'success' && { backgroundColor: '#D1FAE5' },
        tone === 'accent' && { backgroundColor: '#CCFBF1' },
        tone === 'warning' && { backgroundColor: '#FEF3C7' },
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          tone === 'success' && { color: colors.success },
          tone === 'accent' && { color: '#0F766E' },
          tone === 'warning' && { color: '#B45309' },
        ]}
      >
        {label}
      </Text>
    </View>
  )
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <Card style={styles.empty}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
      {action}
    </Card>
  )
}

export function LoadingBlock() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.signal} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  pageDescription: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate500,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  button: {
    minHeight: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: colors.slate900,
  },
  buttonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate600,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  rightElementContainer: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.white,
    color: colors.ink,
    fontSize: 15,
  },
  textArea: {
    minHeight: 110,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: 13,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.slate100,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate600,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.ink,
  },
  emptyDescription: {
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
    color: colors.slate500,
    maxWidth: 320,
  },
  loading: {
    paddingVertical: 48,
    alignItems: 'center',
  },
})
