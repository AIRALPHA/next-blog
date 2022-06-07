import {NextPage} from "next";
import {signInWithPopup, signOut} from "firebase/auth";
import {auth, firestore, googleAuthProvider} from "../lib/firebase";
import {
  Anchor,
  Button,
  Container,
  createStyles,
  Group,
  Paper,
  TextInput,
  Text,
  Title,
  Autocomplete, Loader, Center, Box
} from "@mantine/core";
import {GoogleButton} from "../Components/GoogleButton";
import React, {useCallback, useEffect, useState} from "react";
import {useUserContext} from "../lib/context";
import {doc, getDoc, writeBatch} from "@firebase/firestore";
import debounce from "lodash.debounce";
import {Check, X} from 'tabler-icons-react';

function UserNameForm() {
  const {classes} = useStyles();
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const {user, username} = useUserContext();

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(firestore, 'usernames', username);
        const snap = await getDoc(ref);
        setIsValid(!snap.exists());
        setIsLoading(false);
        console.log("check");
      }
    }, 500),
    [],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[_.]$/
    setFormValue(val);
    if (re.test(val)) {
      setIsLoading(true);
      setIsValid(false)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userDocRef = doc(firestore, "users", user!.uid);
    const usernameDocRef = doc(firestore, "usernames", formValue);

    const batch = writeBatch(firestore);
    batch.set(userDocRef, {username: formValue, photoUrl: user?.photoURL, displayName: user?.displayName});
    batch.set(usernameDocRef, {uid: user?.uid});

    await batch.commit();
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Welcome
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Choose your username
      </Text>

      <Paper withBorder shadow="md" p={10} radius="md" mt="xl">
        <form onSubmit={onSubmit}>
        <Group grow mb="md" mt="md">
          <TextInput
            name="username"
            value={formValue}
            onChange={onChange}
            rightSection={loading ? <Loader size={16}/> : null}
            label="Enter your username"
            placeholder=""
          />
        </Group>
        <Group grow mb="md" mt="md">
          <Button type="submit" onClick={onSubmit}>
            Choose
          </Button>
        </Group>
        <Text color={isValid ? 'teal' : 'red'} mt={5} size="sm">
          <Box ml={7}>{isValid ? <Check size={14} /> : <X size={14} />} Username: {formValue}</Box>
        </Text>
        </form>
      </Paper>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    fontWeight: 900,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const Enter: NextPage = () => {
  const {classes} = useStyles();
  const {user, username} = useUserContext();

  function signInButton() {
    const signInWithGoogle = async () => {
      await signInWithPopup(auth, googleAuthProvider);
    }

    return (
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Welcome
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Login to start writing a post
        </Text>

        <Paper withBorder shadow="md" p={10} radius="md" mt="xl">
          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl" onClick={signInWithGoogle}>Google</GoogleButton>
          </Group>
        </Paper>
      </Container>
    )
  }

  return (
    <main>
      {user ?
        !username ? <UserNameForm/> : signOutButton()
        : signInButton()}
    </main>
  );

  function signOutButton() {
    return <Button variant="default" color="gray" onClick={() => signOut(auth)}>
      Sign Out
    </Button>
  }
}

export default Enter;

