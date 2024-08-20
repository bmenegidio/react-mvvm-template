import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useEffect } from 'react';

import { useRepositoriesListViewModel } from '@/app/repositories/[username]/_components/repositories/useRepositoriesList.view-model';
import { dependencyInjectionContainer } from '@/DI/ioc';

type Props = {
  username: string;
};

export function RepositoriesListView({ username }: Props) {
  const { repositories, handleFetchRepositoriesByUsername } = dependencyInjectionContainer.resolve<
    ReturnType<typeof useRepositoriesListViewModel>
  >('useRepositoriesListViewModel');

  useEffect(() => {
    void handleFetchRepositoriesByUsername(username);
  }, []);

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {repositories.length === 0 && (
          <ListItem sx={{ textAlign: 'center' }}>
            <ListItemText>
              Nenhum repositório encontrado para o usuário <strong>{username}</strong>
            </ListItemText>
          </ListItem>
        )}

        {repositories.map((repository, repositoryIndex) => (
          <Fragment key={repository.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={repository.owner.username} src={repository.owner.avatarUrl} />
              </ListItemAvatar>
              <Stack flexDirection={'column'} gap={2}>
                <ListItemText
                  primary={repository.name}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {repository.description}
                    </Typography>
                  }
                />
                {repository.hasKeywords && (
                  <Stack direction="row" spacing={1}>
                    {repository.keywords
                      ?.split(',')
                      ?.map((keyword) => (
                        <Chip color="primary" size={'small'} key={keyword} label={keyword} />
                      ))}
                  </Stack>
                )}
              </Stack>
            </ListItem>
            {repositoryIndex < repositories.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </Fragment>
        ))}
      </List>
    </>
  );
}
