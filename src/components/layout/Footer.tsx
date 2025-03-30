
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, GraduationCap, BookOpen, Map, Compass, LayoutTemplate, CheckSquare, Globe, MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div>
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md mr-3">
                G
              </div>
              <span className="font-heading font-semibold text-xl text-gray-900">GreekSpark</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              Погружение в греческую культуру и историю. Подготовка к собеседованию на греческое гражданство.
            </p>
            
            <div className="flex space-x-4">
              <SocialIcon icon={<Globe size={18} />} />
              <SocialIcon icon={<MessageSquare size={18} />} />
              <SocialIcon icon={<Mail size={18} />} />
              <SocialIcon icon={<Phone size={18} />} />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 text-gray-900">Разделы</h4>
            <ul className="space-y-3">
              <FooterLink href="/history" icon={<BookOpen size={16} />} label="История Греции" />
              <FooterLink href="/geography" icon={<Map size={16} />} label="География Греции" />
              <FooterLink href="/culture" icon={<Compass size={16} />} label="Культура Греции" />
              <FooterLink href="/politics" icon={<LayoutTemplate size={16} />} label="Политическое устройство" />
              <FooterLink href="/practice" icon={<CheckSquare size={16} />} label="Симулятор собеседования" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 text-gray-900">Ресурсы</h4>
            <ul className="space-y-3">
              <FooterLink href="/faq" icon={<MessageSquare size={16} />} label="Часто задаваемые вопросы" />
              <FooterLink href="/blog" icon={<BookOpen size={16} />} label="Блог" />
              <FooterLink href="/testimonials" icon={<GraduationCap size={16} />} label="Истории успеха" />
              <FooterLink href="/terms" icon={<FileText size={16} />} label="Условия использования" />
              <FooterLink href="/privacy" icon={<Shield size={16} />} label="Политика конфиденциальности" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 text-gray-900">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="text-blue-600 mr-3 mt-1" />
                <span className="text-gray-600">support@greekspark.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-blue-600 mr-3 mt-1" />
                <span className="text-gray-600">+30 210 123 4567</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-blue-600 mr-3 mt-1" />
                <span className="text-gray-600">Афины, Греция</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="py-8 border-t border-gray-200 text-center">
          <p className="flex items-center justify-center text-gray-600 mb-2">
            Создано с <Heart size={16} className="text-pink-500 mx-1 inline" /> для поддержки тех, кто стремится стать гражданином Греции
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GreekSpark. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
      >
        <span className="mr-2 text-blue-500">{icon}</span>
        {label}
      </Link>
    </li>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <a 
      href="#" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

export default Footer;
