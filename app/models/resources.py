from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProjectResource(db.Model):
    __tablename__ = 'project_resources'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    url = db.Column(db.String, nullable=False)

    project = db.relationship("Project", back_populates="resources")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "projectId": self.project_id,
            "url": self.url
        }
