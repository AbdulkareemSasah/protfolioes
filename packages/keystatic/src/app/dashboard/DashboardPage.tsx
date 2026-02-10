import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useEffect, useState } from 'react';

import { Avatar } from '@keystar/ui/avatar';
import { Flex, VStack } from '@keystar/ui/layout';
import { TextLink } from '@keystar/ui/link';
import { tokenSchema } from '@keystar/ui/style';
import { Heading } from '@keystar/ui/typography';

import { Config } from '../../config';

import l10nMessages from '../l10n';
import { useCloudInfo } from '../shell/data';
import { PageBody, PageHeader, PageRoot } from '../shell/page';
import { useViewer } from '../shell/viewer-data';

import { BranchSection } from './BranchSection';
import { DashboardCards } from './DashboardCards';
import { isLocalConfig } from '../utils';

export function DashboardPage(props: { config: Config; basePath: string }) {
  const stringFormatter = useLocalizedStringFormatter(l10nMessages);
  const viewer = useViewer();
  const cloudInfo = useCloudInfo();
  const [customEmail, setCustomEmail] = useState<string | null>(null);

  useEffect(() => {
    if (
      props.config.storage.kind === 'github' &&
      props.config.storage.credentials?.kind === 'custom'
    ) {
      setCustomEmail(localStorage.getItem('keystatic-user-email'));
    }
  }, [props.config]);

  const user = customEmail
    ? { name: customEmail, avatarUrl: undefined }
    : viewer
    ? { name: viewer.name ?? viewer.login, avatarUrl: viewer.avatarUrl }
    : cloudInfo?.user;

  const handleLogout = () => {
    localStorage.removeItem('keystatic-user-email');
    // We also need to clear the cookie, but document.cookie manipulations might be limited.
    // However, reloading will trigger re-authentication if we implement logout logic correctly.
    // But since we rely on the cookie existing for the token, we should delete it.
    document.cookie = 'keystatic-gh-access-token=; Max-Age=0; path=/;';
    window.location.reload();
  };

  return (
    <PageRoot containerWidth="large">
      <PageHeader>
        <Heading elementType="h1" id="page-title" size="small">
          {stringFormatter.format('dashboard')}
        </Heading>
      </PageHeader>
      <PageBody isScrollable>
        <Flex direction="column" gap="xxlarge">
          {user &&
            (props.config.storage.kind !== 'github' || customEmail) && (
              <UserInfo
                user={user}
                manageAccount={!!cloudInfo}
                onLogout={customEmail ? handleLogout : undefined}
              />
            )}

          {!isLocalConfig(props.config) &&
            props.config.storage.kind !== 'github' && <BranchSection />}
          <DashboardCards />
        </Flex>
      </PageBody>
    </PageRoot>
  );
}

function UserInfo({
  user,
  manageAccount,
  onLogout,
}: {
  user: { avatarUrl?: string; name: string };
  manageAccount: boolean;
  onLogout?: () => void;
}) {
  return (
    <Flex alignItems="center" gap="medium" isHidden={{ below: 'tablet' }}>
      <Avatar src={user.avatarUrl} name={user.name} size="large" />
      <VStack gap="medium">
        <Heading
          size="medium"
          elementType="p"
          UNSAFE_style={{
            fontWeight: tokenSchema.typography.fontWeight.bold,
          }}
        >
          Hello, {user.name}!
        </Heading>
        {manageAccount && (
          <TextLink href="https://keystatic.cloud/account">
            Manage Account
          </TextLink>
        )}
        {onLogout && (
          <TextLink onPress={onLogout}>
            Log out
          </TextLink>
        )}
      </VStack>
    </Flex>
  );
}
