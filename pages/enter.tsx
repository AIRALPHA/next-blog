import {NextPage} from "next";
import {signInWithPopup, signOut} from "firebase/auth";
import {auth, googleAuthProvider} from "../lib/firebase";
import {Anchor, Button, Container, createStyles, Group, Paper, TextInput, Text, Title} from "@mantine/core";
import {GoogleButton} from "../Components/GoogleButton";
import React from "react";
import {useUserContext} from "../lib/context";

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
        !username ? userNameForm() : signOutButton()
        : signInButton()}
    </main>
  );

  function signOutButton() {
    return <Button variant="default" color="gray" onClick={() => signOut(auth)}>
      Sign Out
    </Button>
  }

  function userNameForm() {
    return <>Hello</>
  }
}

export default Enter;
