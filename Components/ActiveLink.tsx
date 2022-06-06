import { useRouter } from 'next/router'
import React from 'react';
import {createStyles} from "@mantine/core";

interface activeLinkProps {
  title: string | React.ReactElement,
  href: string
}

const useStyles = createStyles((theme) => ({
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
}));

function ActiveLink({ title, href }: activeLinkProps) {
  const router = useRouter()
  const {classes, cx} = useStyles();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} className={cx(classes.link, {[classes.linkActive]: router.asPath === href})} onClick={handleClick}>
      {title}
    </a>
  )
}

export default ActiveLink
