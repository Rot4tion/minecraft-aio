import { Link } from '@tanstack/react-router'

export default function NavigationMenu() {
  return (
    <nav>
      <ul className="flex gap-2 p-2 text-sm">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
      </ul>
    </nav>
  )
}
