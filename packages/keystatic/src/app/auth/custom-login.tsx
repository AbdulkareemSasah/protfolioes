
import { FormEvent, useState } from 'react';
import { Button } from '@keystar/ui/button';
import { TextField } from '@keystar/ui/text-field';
import { Flex, VStack } from '@keystar/ui/layout';
import { Heading } from '@keystar/ui/typography';
import { Notice } from '@keystar/ui/notice';

export function CustomLoginAuthentication(props: { apiUrl?: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(props.apiUrl || '/api/keystatic/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        localStorage.setItem('keystatic-user-email', username);
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="canvas"
    >
      <form onSubmit={handleSubmit}>
        <VStack gap="large" width="scale.3600" padding="large">
          <Heading align="center" size="medium">
            Log In
          </Heading>
          {error && <Notice tone="critical">{error}</Notice>}
          <TextField
            label="Username"
            value={username}
            onChange={setUsername}
            autoFocus
            isRequired
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            isRequired
          />
          <Button prominence="high" type="submit" isDisabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </VStack>
      </form>
    </Flex>
  );
}
