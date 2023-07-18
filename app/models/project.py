from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    details = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    owner = db.relationship("User", back_populates="projects_owned")
    boards = db.relationship("Board", back_populates="project", cascade="delete-orphan, all")
    resources = db.relationship("ProjectResource", back_populates="project", cascade="delete-orphan, all")
    team = db.relationship("TeamMember", back_populates="project", cascade="delete-orphan, all")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ownerId": self.owner_id,
            "details": self.details,
            "createdAt": self.created_at,
            "owner": self.owner.to_dict(),
            "resources": {resource.id: resource.to_dict() for resource in self.resources},
            "team": {member.user_id: member.to_dict() for member in self.team}
        }


