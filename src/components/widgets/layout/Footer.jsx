import './Footer.scss';

const Footer = () => (
  <>
    <div className='clear' />
    <div className='footer bg-primary'>
      <p className='text-white footer--text'>
        Brazil Japan Joint Team {new Date().getFullYear()} &copy;
      </p>
    </div>
  </>
);

export default Footer;
