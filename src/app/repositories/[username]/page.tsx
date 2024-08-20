'use client';

import { useParams } from 'next/navigation';

import { RepositoriesListView } from '@/app/repositories/[username]/_components/repositories/RepositoriesList.view';
import { RouteParams } from '@/app/repositories/[username]/route-params';

export default function UserRepositoriesPage() {
  const { username } = useParams<RouteParams>();
  return <RepositoriesListView username={username} />;
}
