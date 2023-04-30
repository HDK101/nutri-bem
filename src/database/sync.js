import Food from '@/app/models/Food';
import Menu from '@/app/models/Menu';
import Patient from '@/app/models/Patient';
import Restriction from '@/app/models/Restriction';
import User from '@/app/models/User';

export default async function sync() {
  await User.sync({ alter: true });
  await Food.sync({ alter: true });
  await Restriction.sync({ alter: true });
  await Menu.sync({ alter: true });
  await Patient.sync({ alter: true });
}
