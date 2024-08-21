import { Search } from '@mui/icons-material';
import {
  Avatar,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { asValue } from 'awilix';
import { Fragment } from 'react';

import { useRepositoriesListViewModel } from '@/app/repositories/[username]/_components/repositories/useRepositoriesList.view-model';
import { useRepositoriesListViewModelInjectionToken } from '@/app/repositories/[username]/_components/repositories/view-model-injection-token';
import { Loading } from '@/components/feedback/loading/Loading';
import { dependencyInjectionContainer } from '@/DI/ioc';

type Props = {
  username: string;
};

export function RepositoriesListView({ username }: Props) {
  const listViewScope = dependencyInjectionContainer.createScope();
  listViewScope.register({
    username: asValue(username),
  });

  const { repositories, isError, isLoading, handleFilterChange } = listViewScope.resolve<
    ReturnType<typeof useRepositoriesListViewModel>
  >(useRepositoriesListViewModelInjectionToken);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Typography>
        Não foi possível encontrar repositórios para o usuário <strong>{username}</strong>, por
        favor, verifique o nome do usuário e tente novamente.
      </Typography>
    );
  }

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Grid padding={2} spacing={2} container>
          <Grid xs={12} item>
            <TextField
              label={'Pesquise'}
              placeholder={'Digite pelo nome ou descrição..'}
              size={'small'}
              autoComplete={'off'}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid xs={12} item>
            <Divider />
          </Grid>
        </Grid>

        {repositories?.length === 0 && (
          <ListItem sx={{ textAlign: 'center' }}>
            <ListItemText>
              Nenhum repositório encontrado para o usuário <strong>{username}</strong>
            </ListItemText>
          </ListItem>
        )}

        {repositories?.map((repository, repositoryIndex) => (
          <Fragment key={repository.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={repository.owner.username} src={repository.owner.avatarUrl} />
              </ListItemAvatar>
              <Stack flexDirection={'column'} gap={2}>
                <ListItemText
                  primary={repository.name}
                  secondary={
                    <Typography component="span" variant="body2" color="text.primary">
                      {repository.description}
                    </Typography>
                  }
                />
                {repository.hasKeywords && (
                  <Stack direction="row" flexWrap={'wrap'}>
                    {repository.keywords
                      ?.split(',')
                      ?.map((keyword) => (
                        <Chip
                          color="primary"
                          size={'small'}
                          key={keyword}
                          label={keyword}
                          sx={{ m: 0.5, ml: 0 }}
                        />
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
