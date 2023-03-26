import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/MenuBar.module.css'

export default function MenuBar({ children }) {
  return (
    <div className="container">
      <main>{children}</main>
      <footer>
        <nav>
          <ul className={styles.links}>
            <li>
              <Link href="/" data-active="true"><Image alt="Home" src='/home.png' width='30' height='30'/></Link>
            </li>
            <li>
              <Link href="/schedule"><Image alt="Schedule" src='/list.png' width='30' height='30'/></Link>
            </li>
            <li>
              <Link href="/user"><Image alt="User" src='/user.png' width='30' height='30'/></Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};
