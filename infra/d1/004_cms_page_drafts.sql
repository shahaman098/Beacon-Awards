-- Draft vs published page documents + keep legacy `document` as published mirror.
ALTER TABLE cms_page_documents ADD COLUMN draft_document TEXT;
ALTER TABLE cms_page_documents ADD COLUMN published_document TEXT;

UPDATE cms_page_documents
SET
  draft_document = COALESCE(draft_document, document),
  published_document = COALESCE(published_document, document)
WHERE document IS NOT NULL
  AND (draft_document IS NULL OR published_document IS NULL);
