import Link from "next/link";
import styles from "@/styles/Card.module.css";
import { useState } from "react";

const Recipecard = ({ recipe }) => {
  const { title, timeToCook, slug } = recipe.fields;
  const { id } = recipe.sys;
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleDelete = async () => {
    const confirmation = confirm("Are you sure you want to delete this recipe?");
    if (!confirmation) return;

    try {
      const res = await fetch(`/api/delete-recipe?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Recipe deleted successfully!");

      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the recipe.");
    }
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        <Link href={`/${slug}`} aria-label={title}>
          <h2>{title}</h2>
          <span>Time taken: {timeToCook} minutes</span>
        </Link>
        <button onClick={toggleMenu} className={styles.menuButton}>
          &#x22EE;
        </button>

        {showMenu && (
          <div className={styles.menuList}>
            <button
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Delete 
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Recipecard;
