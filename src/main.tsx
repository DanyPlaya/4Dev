import ReactDOM from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'
import { App } from './app/app'
import { queryClient } from './shared/lib'



ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  
)
