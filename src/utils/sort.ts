import type { BoardColumnInterface } from "@/interface/boardInterface";

export const mapOrder = (
  originalArray: BoardColumnInterface[],
  orderArray: string[],
  key: keyof BoardColumnInterface
): BoardColumnInterface[] => {
  if (!originalArray || !orderArray || !key) return [];

  return [...originalArray].sort(
    (a, b) =>
      orderArray.indexOf(a[key] as string) -
      orderArray.indexOf(b[key] as string)
  );
};
