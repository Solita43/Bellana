from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String(255), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    card = db.relationship("Card", back_populates="tasks")
    user = db.relationship("User", back_populates="tasks")

    def to_dict(self):
        return {
            'id': self.id,
            'details': self.details,
            'cardId': self.card_id,
            'createdAt': self.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
            'updatedAt': self.updated_at.strftime("%m/%d/%Y, %H:%M:%S"),
            "assignee": self.use.to_dict(),
            "card": self.card.to_dict()
        }
