import getCategories from "@/actions/get-category";
import getColor from "@/actions/get-color";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-size";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "./components/mobile-filter";

export const revalidate = 0;

interface CategoryPageProps{
  params:{
    categoryid:string
  },
  searchParams:{
    colorId:string;
    sizeId:string;
  }
}

const CategoryPage:React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  const products = await getProducts({
    categoryId:params.categoryid,
    colorId:searchParams.colorId,
    sizeId:searchParams.sizeId
  })
  const sizes = await getSizes();
  const colors = await getColor();
  const category = await getCategories(params.categoryid);


  return(
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="sizes" data={sizes} />
              <Filter valueKey="colorId" name="colors" data={colors} />
            </div>
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {
              products.length === 0 && <NoResults/>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage;