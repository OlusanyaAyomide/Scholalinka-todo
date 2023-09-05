import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TailwindIndicator } from './components/utils/TailwindIndicator.tsx'
import { AllContextProvider } from './store/store.tsx'
import ThemeChanger from './components/utils/ThemeChager.tsx'
import { QueryClientProvider, QueryClient} from 'react-query'
import { Toaster } from './ui/toaster.tsx'


const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
        <QueryClientProvider client={client}>
            <AllContextProvider>
                <App />
                <TailwindIndicator/>
                <ThemeChanger/>
                <Toaster/>
            </AllContextProvider>
        </QueryClientProvider>
        {/* </LocalizationProvider> */}
        
    </React.StrictMode>
)
