
import ProtectedRoutes from "@/components/auth/ProtectedRoutes"
import Loading from "@/components/main/Loading"
import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

const Landing = lazy(() => import("@/pages/main/Landing"))
const Login = lazy(() => import("@/pages/auth/Login"))
const Home = lazy(() => import("@/pages/main/Home"))
const Products = lazy(() => import("@/pages/main/Products"))
const Locations = lazy(() => import("@/pages/main/Locations"))
const Contacts = lazy(() => import("@/pages/main/Contacts"))
const Branch = lazy(() => import("@/pages/main/Branch"))
const About = lazy(() => import("@/pages/main/About"))
const ProductDetails = lazy(() => import("@/pages/main/ProductDetails"))
const Privacy = lazy(() => import("@/pages/main/Privacy"))
const Policy = lazy(() => import('@/pages/main/Policy'))
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const CategoriesDash = lazy(() => import('@/pages/admin/Categories'))
const UsersDash = lazy(() => import('@/pages/admin/Users'))
const RolesDash = lazy(() => import('@/pages/admin/Roles'))
const TagsDash = lazy(() => import('@/pages/admin/Tags'))
const ProductsDash = lazy(() => import('@/pages/admin/Products'))
const SchedulesDash = lazy(() => import('@/pages/admin/Schedules'))
const BranchDash = lazy(() => import('@/pages/admin/Branch'))
const BranchAdd = lazy(() => import('@/pages/admin/BranchAdd'))
const Banner = lazy(() => import('@/pages/admin/Banner'))
const BranchEdit = lazy(() => import('@/pages/admin/BranchEdit'))
const CartDetails = lazy(() => import('@/pages/main/CartDetails'))
export default function index() {

  const routes = createBrowserRouter([
    {
      path:'/',
      element: <Landing />,
      children: [
        {
          path:'',
          element: <Home />,
          index: true,
        },
        {
          path:'products',
          element: (
            <Suspense fallback={<Loading />}> 
              <Products />
            </Suspense>
          ),
        },
        {
          path:'products/:id',
          element: (
            <Suspense fallback={<Loading />}> 
              <ProductDetails />
            </Suspense>
          ),
        },
        {
          path:'locations',
          element: (
            <Suspense fallback={<Loading />}> 
              <Locations />
            </Suspense>
          ),
        },
        {
          path:'contacts',
          element: (
            <Suspense fallback={<Loading />}> 
              <Contacts />
            </Suspense>
          ),
        },
        {
          path:'branches',
          element: (
            <Suspense fallback={<Loading />}> 
              <Branch />
            </Suspense>
          ),
        },
        {
          path:'about',
          element: (
            <Suspense fallback={<Loading />}> 
              <About />
            </Suspense>
          ),
        },
        {
          path:'privacy',
          element: (
            <Suspense fallback={<Loading />}> 
              <Privacy />
            </Suspense>
          ),
        },
        {
          path:'policy',
          element: (
            <Suspense fallback={<Loading />}> 
              <Policy />
            </Suspense>
          ),
        },
        {
          path:'cart',
          element: (
            <Suspense fallback={<Loading />}> 
              <CartDetails />
            </Suspense>
          ),
        }
  
      ]
    },
    {
      path:'auth',
      element: <Login />,
    },
    {
      path:'admin',
      element: (
        <ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>
      ),
      children: [
        {
          element: <Navigate to="/admin/products" />,
          index: true,
        },
        {
          element: <CategoriesDash />,
          path:'categories',
        },
        {
          element: <UsersDash />,
          path:'users',
        },
        {
          element: <RolesDash />,
          path:'roles',
        },
        {
          element: <TagsDash />,
          path:'tags',
        },
        {
          element: <BranchDash />,
          path:'branchs',
        },
        {
          element: <ProductsDash />,
          path:'products',
        },
        {
          path:'schedules',
          element: <SchedulesDash />,
        },
        {
          path:'branchs/add',
          element: <BranchAdd />,
        },
        {
          path:'branchs/edit/:id',
          element: <BranchEdit />,
        },
        {
          path:'banner',
          element: <Banner />,
        }
        
      ]
    }
    
  ])

  return (
    <RouterProvider router={routes} />
  )
}
