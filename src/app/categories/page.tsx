import { createClient } from "@/utils/supabase/server";
import CategoryManager from "@/components/CategoryManager";

export default async function Page() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <CategoryManager initialCategories={categories || []} />
    </div>
  );
}
