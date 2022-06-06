import React, {useState} from 'react';
import {createStyles, Header, Container, Group, Burger, Box} from '@mantine/core';
import {useBooleanToggle} from '@mantine/hooks';
import Avvvatars from "avvvatars-react";
import {useRouter} from 'next/router'
import ActiveLink from "./ActiveLink";
import {useUserContext} from "../lib/context";

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  logo: {
    fontWeight: 700,
    padding: '10px 14px',
    fontSize: theme.fontSizes.lg,
    cursor: 'pointer',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
        : theme.colors[theme.primaryColor][0],
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
  }
}));

export function HeaderApp() {
  const {user, username} = useUserContext();
  alert(username);
  const router = useRouter();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const {classes, cx} = useStyles();

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Box
          className={cx(classes.logo)}
          onClick={() => router.push("/")}
        >
          BLOG
        </Box>
        <Group spacing={5} className={classes.links}>
          <ActiveLink href="/" title="Feed"/>
          {user ?
            <>
              <ActiveLink title="Write Posts" href="/admin"/>
              <ActiveLink title={<Avvvatars style="shape" value={username ?? ""}/>} href={`/${username}`}/>
            </> :
            <ActiveLink title="Login" href="/enter"/>

          }
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
