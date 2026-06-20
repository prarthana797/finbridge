import Navbar from '../components/Navbar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import Chatbot from '../components/Chatbot.jsx';
import Toast from '../components/Toast.jsx';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>
      <BottomNav />
      <Chatbot />
      <Toast />
    </>
  );
}
