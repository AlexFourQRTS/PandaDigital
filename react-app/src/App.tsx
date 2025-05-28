import React from 'react'
import { Route, Switch, Link } from 'wouter'
import { Menu } from 'lucide-react'

// Простые компоненты страниц пока что
const HomePage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🐼 Добро пожаловать в <span className="text-orange-500">Panda</span>
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-orange-400">Блог</h2>
          <p className="text-gray-300">Читайте наши статьи о технологиях и разработке</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-orange-400">Медиа</h2>
          <p className="text-gray-300">Галерея изображений, видео и документов</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-orange-400">Новости</h2>
          <p className="text-gray-300">Последние новости из мира технологий</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-orange-400">Чат</h2>
          <p className="text-gray-300">Общайтесь с другими пользователями в реальном времени</p>
        </div>
      </div>
    </div>
  </div>
)

const BlogPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">📝 Блог</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-orange-400">Скоро здесь будут статьи!</h2>
        <p className="text-gray-300">Мы работаем над созданием интересного контента для вас.</p>
      </div>
    </div>
  </div>
)

const MediaPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">🎨 Медиа</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-orange-400">Галерея медиафайлов</h2>
        <p className="text-gray-300">Здесь будут отображаться изображения, видео и документы.</p>
      </div>
    </div>
  </div>
)

const NewsPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">📰 Новости</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-orange-400">Последние новости</h2>
        <p className="text-gray-300">Актуальные новости из мира технологий будут здесь.</p>
      </div>
    </div>
  </div>
)

const ChatPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">💬 Чат</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-orange-400">Чат в реальном времени</h2>
        <p className="text-gray-300">Скоро здесь появится функция общения в реальном времени.</p>
      </div>
    </div>
  </div>
)

const AboutPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">ℹ️ О нас</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-orange-400">О платформе Panda</h2>
        <p className="text-gray-300">Информация о нашей платформе и команде.</p>
      </div>
    </div>
  </div>
)

// Навигация
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Блог', href: '/blog' },
    { name: 'Медиа', href: '/media' },
    { name: 'Новости', href: '/news' },
    { name: 'Чат', href: '/chat' },
    { name: 'О нас', href: '/about' },
  ]

  return (
    <header className="bg-gray-900 shadow-xl sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-white">🐼 <span className="text-orange-500">Panda</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className="px-3 py-2 text-sm font-medium transition-colors rounded-md text-gray-300 hover:text-orange-400 hover:bg-gray-800">
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-orange-400 hover:bg-gray-800 p-2 rounded-md"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className="block px-3 py-2 text-base font-medium transition-colors rounded-md text-gray-300 hover:text-orange-400 hover:bg-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// Подвал
const Footer = () => (
  <footer className="bg-black text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">🐼 Panda</h3>
          <p className="text-gray-400 mb-4">
            Ваша платформа для блогов, медиа и общения в реальном времени.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Платформа</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/blog"><a className="hover:text-orange-500 transition-colors">Блог</a></Link></li>
            <li><Link href="/media"><a className="hover:text-orange-500 transition-colors">Медиа</a></Link></li>
            <li><Link href="/news"><a className="hover:text-orange-500 transition-colors">Новости</a></Link></li>
            <li><Link href="/chat"><a className="hover:text-orange-500 transition-colors">Чат</a></Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Ресурсы</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Документация</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">API</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Поддержка</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Связь</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Panda Platform. Все права защищены.</p>
      </div>
    </div>
  </footer>
)

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/media" component={MediaPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/chat" component={ChatPage} />
          <Route path="/about" component={AboutPage} />
          <Route>
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
                <p className="text-xl text-gray-400">Страница не найдена</p>
                <Link href="/">
                  <a className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                    На главную
                  </a>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App