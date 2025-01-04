import Button from "./Button"
import Emblem from "./Emblem"
import Search from "./Search"
import Title from "./Title"
function Header() {
    return <div className = "header">
                <Emblem to="/" />
                <Title/>
                <Search/>
                <div className="nav-buttons">
                  <Button pageName="About" to="/about" />
                  <Button pageName="Browse Dictionary" to="/browse-dictionary" />
                  <Button pageName="Language Help" to="/language-help" />
              </div>
            </div>
}

export default Header