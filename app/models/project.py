from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from random import randint

choices=['green', 'light-pink', 'red', 'purple', 'blue']

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    details = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    color = db.Column(db.String, default=choices[randint(0 , len(choices) - 1)])


    # relationships - use lazy='joined' to load relationships when querying for a project

    owner = db.relationship("User", back_populates="projects_owned", lazy='joined')
    boards = db.relationship("Board", back_populates="project", cascade="delete-orphan, all", lazy='joined')
    resources = db.relationship("ProjectResource", back_populates="project", cascade="delete-orphan, all", lazy='joined')
    team = db.relationship("TeamMember", back_populates="project", cascade="delete-orphan, all", lazy='joined')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ownerId": self.owner_id,
            "details": self.details,
            "color": self.color,
            "createdAt": self.created_at,
            "owner": self.owner.to_dict(),
            "resources": {resource.id: resource.to_dict() for resource in self.resources},
            "team": {member.user_id: member.to_dict() for member in self.team}
        }


