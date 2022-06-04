import React, {useState} from 'react';
import {createStyles, Header, Container, Group, Burger} from '@mantine/core';
import {useBooleanToggle} from '@mantine/hooks';
import Avvvatars from "avvvatars-react";
import Link from "next/link";

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

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
  logo: {
    fontWeight: 700,
    padding: '10px 14px',
    fontSize: theme.fontSizes.lg,
  }
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function HeaderApp({links}: HeaderSimpleProps) {
  const username: string = "hello";
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState("/");
  const {classes, cx} = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {[classes.linkActive]: active === link.link})}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <a
          key="index"
          href="/"
          className={cx(classes.link, classes.logo, classes.linkActive)}
          onClick={(event) => {
            setActive("/");
          }}
        >
          BLOG
        </a>
        <Group spacing={5} className={classes.links}>
          <a
            key="feed"
            href="/"
            className={cx(classes.link, {[classes.linkActive]: active === "/"})}
            onClick={(event) => {
              event.preventDefault();
              setActive("/");
            }}
          >
            Feed
          </a>

          {username ?
            <>
              <a
                key="admin"
                href="/admin"
                className={cx(classes.link, {[classes.linkActive]: active === "/admin"})}
                onClick={(event) => {
                  event.preventDefault();
                  setActive("/admin");
                }}
              >
                Write Posts
              </a>
              <a
                key="username"
                href={`/${username}`}
                className={cx(classes.link, {[classes.linkActive]: active === `/${username}`})}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(`/${username}`);
                }}
              >
                <Avvvatars value="tim@apple.com"/>
              </a>
            </> :
            <>
              <a
                key="login"
                href="/enter"
                className={cx(classes.link, {[classes.linkActive]: active === "/enter"})}
                onClick={(event) => {
                  event.preventDefault();
                  setActive("/enter");
                }}
              >
                Login
              </a>
            </>
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
