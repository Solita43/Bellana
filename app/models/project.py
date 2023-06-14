from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    owner = db.relationship("User", back_populates="projects")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ownerId": self.owner_id,
            "createdAt": self.created_at
        }

