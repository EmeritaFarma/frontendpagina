
import Router from '@/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

function App() {

  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-right'/> 
      <Router />
    </QueryClientProvider>
  )
}

export default App

