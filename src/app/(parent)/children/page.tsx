import React from 'react';
import ChildrenList from '@/components/children/children-list';
import { api } from '@/trpc/server';

const ChildrenPage = async () => {
  const kids = await api.child.mine.query();
  return <ChildrenList kids={kids} />;
};

export default ChildrenPage;
