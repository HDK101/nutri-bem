import Food from '@/app/models/Food';
import Menu from '@/app/models/Menu';
import Patient from '@/app/models/Patient';
import Restriction from '@/app/models/Restriction';
import User from '@/app/models/User';

const models = {
  Food,
  Menu,
  Patient,
  Restriction,
  User,
};

export default async function associate() {
  Object
    .values(models)
    .filter((model) => model.associate)
    .forEach((model) => model?.associate(models));
}
