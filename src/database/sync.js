import User from '@/app/models/User';

export default async function sync() {
  await User.sync({ alter: true });
}
