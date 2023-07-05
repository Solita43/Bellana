from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String(255), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False)
    status = db.Column(db.String, nullable=False, default="Not started")
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    card = db.relationship("Card", back_populates="tasks")
    user = db.relationship("User", back_populates="tasks")
    board = db.relationship("Board", back_populates="tasks")

    def to_dict(self):
        return {
            'id': self.id,
            'details': self.details,
            'cardId': self.card_id,
            'status': self.status,
            'order': self.order,
            'createdAt': self.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
            'updatedAt': self.updated_at.strftime("%m/%d/%Y, %H:%M:%S"),
            "assignee": self.user.to_dict()
        }
