/* explanation -> visit 'ClientFriendsPage.tsx' */

import ClientFriendsPage from './ClientFriendsPage';
import UserFriendsList from '@/components/user/UserFriendsList';

export default function FriendsPage() {
  return (
    <ClientFriendsPage>
      <UserFriendsList />
    </ClientFriendsPage>
  );
}
