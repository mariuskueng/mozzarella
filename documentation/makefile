all: publish

# Source Directories
ASSETSDIR="assets"
FIGUREDIR="figures"

# Individual Assets
TEXPREAMBLE="options.sty"
BIBBIBLIOGRAPHY="references.bib"
YAMLMETADATA="metadata.yaml"

# Build and Output
BUILDDIR="build"
DOCUMENTMARKDOWN="documentation.markdown"
DOCUMENTPDF="documentation.pdf"
DOCUMENTDOCX="documentation.docx"

PUBLISHDIR="publish"


prepare:
	@echo "Preparing ..."
	@mkdir -p $(BUILDDIR)
	@cat `find . -name "*.markdown" | sort` > $(BUILDDIR)/$(DOCUMENTMARKDOWN)
	@cp -R $(FIGUREDIR) $(BUILDDIR)


pdf: prepare
	@echo "Creating pdf output ..."
	@pandoc \
		--latex-engine=xelatex \
		--include-in-header=$(ASSETSDIR)/$(TEXPREAMBLE) \
		--bibliography=$(ASSETSDIR)/$(BIBBIBLIOGRAPHY) \
		--variable documentclass=scrbook \
		--variable fontsize=13pt \
		--variable classoption=openright \
		--variable papersize=a4paper,oneside,headsepline \
		--variable bibliography=totocnumbered \
		--highlight-style=tango \
		--table-of-contents \
		--toc-depth=4 \
		-fmarkdown-implicit_figures \
		--number-sections \
		--chapter $(BUILDDIR)/$(DOCUMENTMARKDOWN) $(ASSETSDIR)/$(YAMLMETADATA) \
		--output $(BUILDDIR)/$(DOCUMENTPDF)


docx: prepare
	@echo "Creating docx output ..."
	@pandoc \
		--standalone -S $(BUILDDIR)/$(DOCUMENTMARKDOWN) \
		--output $(BUILDDIR)/$(DOCUMENTDOCX)


publish: pdf
	@echo "Publishing final results ..."
	@mkdir -p $(PUBLISHDIR)
	@cp $(BUILDDIR)/$(DOCUMENTPDF) $(PUBLISHDIR)


clean:
	@echo "Cleaning up ..."
	@rm -r $(BUILDDIR)
