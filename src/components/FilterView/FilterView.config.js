import { RiBookOpenLine, RiTShirt2Line } from "react-icons/ri";
import { category } from "../../constant";

export const items = [
  {
    key: category.SECOND_HAND,
    label: (
      <div>
        <RiTShirt2Line />
        Áo quần 2-hand
      </div>
    ),
  },
  {
    key: category.GIVE,
    label: (
      <div>
        <RiTShirt2Line />
        Áo quần tặng
      </div>
    ),
  },
  {
    key: category.BOOK,
    label: (
      <div>
        <RiBookOpenLine />
        Sách vở
      </div>
    ),
  },
];
