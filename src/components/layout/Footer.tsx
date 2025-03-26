
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Map, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-lg bg-greek-darkBlue text-white flex items-center justify-center font-heading font-bold text-xl mr-3">
                G
              </div>
              <span className="font-heading font-semibold text-xl text-gray-900">GreekSpark</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              Погружение в греческую культуру и историю. Подготовка к собеседованию на греческое гражданство.
            </p>
            
            <div className="flex space-x-4">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="twitter" />
              <SocialIcon icon="instagram" />
              <SocialIcon icon="youtube" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 text-gray-900">Разделы</h4>
            <ul className="space-y-3">
              <FooterLink href="/history" label="История Греции" />
              <FooterLink href="/geography" label="География Греции" />
              <FooterLink href="/culture" label="Культура Греции" />
              <FooterLink href="/politics" label="Политическое устройство" />
              <FooterLink href="/interview" label="Симулятор собеседования" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 text-gray-900">Ресурсы</h4>
            <ul className="space-y-3">
              <FooterLink href="/faq" label="Часто задаваемые вопросы" />
              <FooterLink href="/blog" label="Блог" />
              <FooterLink href="/testimonials" label="Истории успеха" />
              <FooterLink href="/terms" label="Условия использования" />
              <FooterLink href="/privacy" label="Политика конфиденциальности" />
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 text-gray-900">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={20} className="text-greek-darkBlue mr-3 mt-1" />
                <span className="text-gray-600">support@greekspark.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-greek-darkBlue mr-3 mt-1" />
                <span className="text-gray-600">+30 210 123 4567</span>
              </li>
              <li className="flex items-start">
                <Map size={20} className="text-greek-darkBlue mr-3 mt-1" />
                <span className="text-gray-600">Афины, Греция</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center">
            Создано с <Heart size={16} className="text-red-500 mx-1 inline" /> для поддержки тех, кто стремится стать гражданином Греции
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} GreekSpark. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-gray-600 hover:text-greek-darkBlue transition-colors duration-300"
      >
        {label}
      </Link>
    </li>
  );
};

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => {
  return (
    <a 
      href={`https://${icon}.com`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-greek-darkBlue hover:text-white transition-colors duration-300"
    >
      <i className={`fab fa-${icon}`}></i>
      {/* Simple placeholder for social icons */}
      {icon.charAt(0).toUpperCase()}
    </a>
  );
};

export default Footer;
