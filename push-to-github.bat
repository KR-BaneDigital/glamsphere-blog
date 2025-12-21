@echo off
echo ========================================
echo Committing to v0-faceless-templates repo
echo ========================================
git add .
git commit -m "Add affiliate-product-review template with v0 hero and author bio section"
git push origin master:main
echo.
echo ========================================
echo Push complete! Check Vercel for deployment
echo ========================================
