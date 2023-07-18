from .db import db, environment, SCHEMA, add_prefix_for_prod

class TeamMember(db.Model):
    __tablename__ = 'team_members'

    _table_args__ = (db.UniqueConstraint("project_id", "owner", "user_id", name="one_owner_per_project"),)

    if environment == "production":
        __table_args__ = (db.UniqueConstraint("project_id", "owner", "user_id", name="one_owner_per_project"), {"schema": SCHEMA})

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    role = db.Column(db.String(20), nullable=True)
    owner= db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)

    project = db.relationship("Project", back_populates="team")
    user = db.relationship("User", back_populates="projects")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "projectId": self.project_id,
            "role": self.role,
            "owner": self.owner
        }