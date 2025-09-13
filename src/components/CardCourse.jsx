import React from "react";
import { Card, Button } from "antd";

export default function CardCourse({ course, currentRole, onEnroll, onQuit, onEdit, onDelete }) {
  const { titre, description, image_url, formateurNomComplet, enrolled } = course;

  return (
    <Card
      hoverable
      cover={
        <img
          alt={titre}
          src={image_url || "/placeholder-course.png"}
          style={{ height: 180, objectFit: "cover" }}
        />
      }
      actions={[
        // ✅ Bouton "S’inscrire" pour l’apprenant (page /cours)
        currentRole === "APPRENANT" && !enrolled && (
          <Button type="primary" size="small" onClick={() => onEnroll && onEnroll(course)}>
            S’inscrire
          </Button>
        ),

        // ✅ Bouton "Quitter" pour l’apprenant (page /my-courses)
        currentRole === "APPRENANT" && enrolled && (
          <Button danger size="small" onClick={() => onQuit && onQuit(course)}>
            Quitter
          </Button>
        ),

        // ✅ Boutons Formateur / Admin
        (currentRole === "FORMATEUR" || currentRole === "ADMIN") && (
          <>
            <Button type="link" size="small" onClick={() => onEdit && onEdit(course)}>
              ✏️ Modifier
            </Button>
            <Button type="link" danger size="small" onClick={() => onDelete && onDelete(course)}>
              🗑️ Supprimer
            </Button>
          </>
        )
      ].filter(Boolean)}
    >
      <Card.Meta
        title={titre}
        description={
          <>
            <p style={{ height: 40, overflow: "hidden", textOverflow: "ellipsis" }}>{description}</p>
            <small>{formateurNomComplet}</small>
          </>
        }
      />
    </Card>
  );
}
