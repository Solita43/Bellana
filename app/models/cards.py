from .db import db, environment, SCHEMA, add_prefix_for_prod


class Card(db.Model):
    __tablename__ = "cards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(25), nullable=False)
    board_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=False
    )
    order = db.Column(db.Integer, nullable=False)

    board = db.relationship("Board", back_populates="cards")

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "boardId": self.board_id,
            "order": self.order,
        }