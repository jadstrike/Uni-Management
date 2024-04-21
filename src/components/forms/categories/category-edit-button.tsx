import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CategoryEditButton = (id: string, name: string) => {
  const router = useRouter();
  console.log(name);
  console.log(id);

  return (
    <Button
      // onClick={() => deleteCategoey(category.id)}
      type="submit"
    >
      Save changes
    </Button>
  );
};

export default CategoryEditButton;
